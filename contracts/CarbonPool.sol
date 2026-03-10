// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Carbon Pool Token (ERC-20 Wrapper for ERC-1155 Vintages)
 * @notice fractionalizes high-integrity carbon credits to enable AMM liquidity.
 */
contract CarbonPool is ERC20, ERC1155Holder, Ownable {
    IERC1155 public immutable registry;
    
    // Eligibility criteria for this pool (e.g., Bhutan Nature-Based 2024+)
    mapping(uint256 => bool) public eligibleProjectIds;
    
    event Deposited(address indexed user, uint256 indexed projectId, uint256 amount);
    event Withdrawn(address indexed user, uint256 indexed projectId, uint256 amount);
    event ProjectEligibilityUpdated(uint256 indexed projectId, bool eligible);

    constructor(
        string memory name, 
        string memory symbol, 
        address _registry
    ) ERC20(name, symbol) Ownable(msg.sender) {
        registry = IERC1155(_registry);
    }

    /**
     * @notice Updates the eligibility of a project for this pool.
     */
    function setProjectEligibility(uint256 projectId, bool eligible) external onlyOwner {
        eligibleProjectIds[projectId] = eligible;
        emit ProjectEligibilityUpdated(projectId, eligible);
    }

    /**
     * @notice Deposit ERC-1155 carbon credits and mint 1:1 ERC-20 pool tokens.
     */
    function deposit(uint256 projectId, uint256 amount) external {
        require(eligibleProjectIds[projectId], "Project not eligible for this pool");
        
        // Transfer ERC-1155 from user to this contract
        registry.safeTransferFrom(msg.sender, address(this), projectId, amount, "");
        
        // Mint 1:1 ERC-20 tokens (assuming 1 credit = 1 token with 18 decimals)
        // Adjust decimals if necessary (carbon credits are usually 1 unit = 1 ton)
        _mint(msg.sender, amount * 10**decimals());
        
        emit Deposited(msg.sender, projectId, amount);
    }

    /**
     * @notice Burn ERC-20 pool tokens to withdraw specific ERC-1155 carbon credits.
     */
    function withdraw(uint256 projectId, uint256 amount) external {
        require(balanceOf(msg.sender) >= amount * 10**decimals(), "Insufficient pool tokens");
        require(registry.balanceOf(address(this), projectId) >= amount, "Insufficient credits in pool");

        // Burn ERC-20 tokens
        _burn(msg.sender, amount * 10**decimals());
        
        // Transfer ERC-1155 back to user
        registry.safeTransferFrom(address(this), msg.sender, projectId, amount, "");
        
        emit Withdrawn(msg.sender, projectId, amount);
    }

    // Required override
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155Holder) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
