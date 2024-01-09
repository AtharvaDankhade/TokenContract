// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RamMint is ERC20, Ownable {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _token[_symbol] = true;
        Admins[msg.sender] = true;
    }

    mapping(string => bool) private _token;
    mapping (address => bool) private Admins;

    modifier checkAdmins() {
        require(Admins[msg.sender] == true,"Not Authorised user");
        _;
    }

    //It will add new admins in the system.
    function addAdmins(address _address) public onlyOwner { 
        Admins[_address] = true;
    }

    //It will lock the token.
    function lockTokens(string memory _symbol) public checkAdmins {
        _token[_symbol] = true;
    }

    //It will unlock the token.
    function unlockToken(string memory _symbol) public checkAdmins {
        _token[_symbol] = false;
    }

    //only authorized address can access the function and mint token for any address.
    function unlockAndClame(string memory _symbol,address _to, uint _quantity) public checkAdmins
    {
        require(_token[_symbol] == true,"Token is locked");
        _mint(_to, _quantity);
    }

    function removeAdmin(address _address) public {
        Admins[_address] = false;
    }

    function isTokenLocked(string memory symbol) external view returns (bool) {
        return _token[symbol];
    }
}
