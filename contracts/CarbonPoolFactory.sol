// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CarbonPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Carbon Pool Factory
 * @notice deploys standardized CarbonPools for distinct asset classes.
 */
contract CarbonPoolFactory is Ownable {
    address public immutable registry;
    address[] public allPools;
    
    mapping(string => address) public poolBySymbol;

    event PoolCreated(address indexed poolAddress, string symbol, string name);

    constructor(address _registry) Ownable(msg.sender) {
        registry = _registry;
    }

    /**
     * @notice Deploys a new CarbonPool for a specific class of carbon credits.
     */
    function createPool(
        string memory name, 
        string memory symbol
    ) external onlyOwner returns (address) {
        require(poolBySymbol[symbol] == address(0), "Pool already exists for this symbol");

        CarbonPool newPool = new CarbonPool(name, symbol, registry);
        
        // Transfer ownership of the pool to the factory owner
        newPool.transferOwnership(msg.sender);
        
        allPools.push(address(newPool));
        poolBySymbol[symbol] = address(newPool);

        emit PoolCreated(address(newPool), symbol, name);
        return address(newPool);
    }

    function getPoolCount() external view returns (uint256) {
        return allPools.length;
    }

    function getPools() external view returns (address[] memory) {
        return allPools;
    }
}
