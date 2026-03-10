// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Himalaya Carbon Registry (Article 6 Compliant)
 * @author Himalaya Carbon Team
 * @notice This contract manages the tokenization of Bhutan's National Carbon Assets.
 * @dev Implements ERC1155 for handling multiple project vintages under a single registry contract.
 */
contract HimalayaCarbonRegistry is ERC1155, Ownable, ERC1155Supply {
    using Strings for uint256;

    // Project Status Enum
    enum ProjectStatus { Pending, Authorized, Issued, Retired }

    // Registry Participant Roles (Institutional Whitelist)
    mapping(address => bool) public authorizedParticipants;

    // Mapping project IDs to their CAD Trust metadata/registry status
    struct ProjectMetadata {
        string projectName;
        string projectID; // CAD Trust ID
        uint256 vintageYear;
        ProjectStatus status;
        bool isArticle6Authorized;
        bool correspondingAdjustmentFinalized; // Article 6.2 CA status
        string itmoAuthorizationID; // Bilateral agreement ID (e.g., BT-SG-2025)
        string methodology;
        string serialNumber;
        uint256 totalIssuance;
        uint256 retiredAmount;
    }

    mapping(uint256 => ProjectMetadata) public projectData;
    string public name = "Himalaya Carbon Registry";
    string public symbol = "HCR";

    event CarbonMinted(address indexed to, uint256 indexed id, uint256 amount, string projectID);
    event CarbonRetired(
        address indexed holder, 
        uint256 indexed id, 
        uint256 amount, 
        string beneficiary, 
        string purpose
    );
    event Article6StatusUpdated(uint256 indexed id, bool authorized);
    event ParticipantAuthorized(address indexed account, bool authorized);
    event CorrespondingAdjustmentRecorded(uint256 indexed id, bool finalized);

    constructor(string memory baseUri) ERC1155(baseUri) Ownable(msg.sender) {}

    /**
     * @notice Mints carbon credits (vintages) to a participant.
     * @param to Recipient address (Participant/Broker)
     * @param id The token ID (Project Vintage)
     * @param amount Number of metric tons (tokens) to mint
     * @param metadata The metadata for this project (initially set by the Ministry/Registry)
     */
    function mintCarbonCredit(
        address to,
        uint256 id,
        uint256 amount,
        ProjectMetadata memory metadata
    ) public onlyOwner {
        if (bytes(projectData[id].projectID).length == 0) {
            projectData[id] = metadata;
        }
        _mint(to, id, amount, "");
        emit CarbonMinted(to, id, amount, metadata.projectID);
    }

    /**
     * @notice Authorizes a participant (institution) to interact with the registry.
     */
    function setParticipantAuthorization(address account, bool status) public onlyOwner {
        authorizedParticipants[account] = status;
        emit ParticipantAuthorized(account, status);
    }

    /**
     * @notice Updates the Article 6.2 authorization status and ITMO ID for a project vintage.
     * @param id The token ID
     * @param status New authorization status
     * @param itmoId The bilateral authorization ID
     */
    function setArticle6Status(uint256 id, bool status, string memory itmoId) public onlyOwner {
        projectData[id].isArticle6Authorized = status;
        projectData[id].itmoAuthorizationID = itmoId;
        emit Article6StatusUpdated(id, status);
    }

    /**
     * @notice Finalizes the Corresponding Adjustment (CA) for a specific vintage.
     */
    function setCorrespondingAdjustment(uint256 id, bool finalized) public onlyOwner {
        projectData[id].correspondingAdjustmentFinalized = finalized;
        emit CorrespondingAdjustmentRecorded(id, finalized);
    }

    /**
     * @notice High-integrity retirement with on-chain beneficiary and purpose.
     * @param id The token ID
     * @param amount Number of credits to retire
     * @param beneficiary The person or entity claiming the climate impact
     * @param purpose The reason for retirement (e.g. CSR 2024 Offset)
     */
    function retire(uint256 id, uint256 amount, string memory beneficiary, string memory purpose) public {
        require(balanceOf(msg.sender, id) >= amount, "Insufficient credits");
        _burn(msg.sender, id, amount);
        projectData[id].retiredAmount += amount;
        emit CarbonRetired(msg.sender, id, amount, beneficiary, purpose);
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(id), id.toString(), ".json"));
    }

    // Required overrides with Whitelist Enforcement
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        // Require that the recipient is an authorized participant 
        // We skip this check for 'address(0)' cases which are burns (retirement)
        if (from != address(0) && to != address(0)) {
            require(authorizedParticipants[to], "Recipient is not an authorized registry participant");
        }
        
        super._update(from, to, ids, values);
    }
}
