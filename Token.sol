// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WhitelistedToken is ERC20, Ownable {
    address[] private _whitelistedAccounts;
    bool private _isTransferLocked;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable() {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function distributeToWhitelist(uint256 amount) external onlyOwner {
        require(_whitelistedAccounts.length > 0, "No whitelisted accounts provided");
        require(amount > 0, "Amount must be greater than 0");
        require(!_isTransferLocked, "Token transfer is currently locked");

        uint256 share = amount / _whitelistedAccounts.length;
        for (uint256 i = 0; i < _whitelistedAccounts.length; i++) {
            address recipient = _whitelistedAccounts[i];
            _transfer(owner(), recipient, share);
        }
    }

    // Owner-only functions to manage whitelisted accounts
    function whitelistAccount(address account) external onlyOwner {
        require(!_isWhitelisted(account), "Account already whitelisted");
        _whitelistedAccounts.push(account);
    }

    function unwhitelistAccount(address account) external onlyOwner {
        require(_isWhitelisted(account), "Account not whitelisted");
        _removeWhitelistedAccount(account);
    }

    function getWhitelistedAccounts() external view returns (address[] memory) {
        return _whitelistedAccounts;
    }

    function lockTransfer() external onlyOwner {
        _isTransferLocked = true;
    }

    function unlockTransfer() external onlyOwner {
        _isTransferLocked = false;
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(!_isTransferLocked, "Token transfer is currently locked");
        return super.transfer(to, value);
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        require(!_isTransferLocked, "Token transfer is currently locked");
        return super.transferFrom(from, to, value);
    }

    function _isWhitelisted(address account) internal view returns (bool) {
        for (uint256 i = 0; i < _whitelistedAccounts.length; i++) {
            if (_whitelistedAccounts[i] == account) {
                return true;
            }
        }
        return false;
    }

    function _removeWhitelistedAccount(address account) internal {
        for (uint256 i = 0; i < _whitelistedAccounts.length; i++) {
            if (_whitelistedAccounts[i] == account) {
                if (i != _whitelistedAccounts.length - 1) {
                    _whitelistedAccounts[i] = _whitelistedAccounts[_whitelistedAccounts.length - 1];
                }
                _whitelistedAccounts.pop();
                break;
            }
        }
    }
}
