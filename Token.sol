// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RamMint is ERC20("RamMint","RR"), Ownable {
    uint _start;
    uint _end;
    struct holder_info {
        uint token_quantity;
        uint locking_time;
    }

    mapping (address => holder_info) public token_holders;

    //Checks if the token time span is expired or not, if expired then the token is taken back from the specicied account.
    modifier timeOver() {
        if(block.timestamp >= token_holders[msg.sender].locking_time)
        {
            mintForContract(token_holders[msg.sender].token_quantity);
            token_holders[msg.sender].token_quantity = 0;
            token_holders[msg.sender].locking_time = 0;
        }
        _;
    }

    //Initializes the contract with the required number of tokens.
    function mintForContract(uint _tokensToMint) public onlyOwner {
        _mint(msg.sender,_tokensToMint);
    }

    //adds addresses with the specified token quantity and time span.
    function addMembers(address _holder_address, uint _token_quantity, uint _locking_time)  public onlyOwner{
        require(balanceOf(msg.sender) > _token_quantity ,"Not enough tokens to add new member");
        _transfer(msg.sender, _holder_address, _token_quantity);
        lock(_holder_address,_locking_time);
        token_holders[_holder_address].token_quantity = _token_quantity;
    }

    //locks the token for specified amount of time.
    function lock(address _address,uint _time) internal {
        _start = block.timestamp;
        _end = _time + _start;
        token_holders[_address].locking_time = _end;
    }

    //Checks if there is token availabel or not by checking the expiration of the token.
    function getTimeLeft() public timeOver returns(uint) {
        return token_holders[msg.sender].locking_time - block.timestamp;
    }

    function spendToken() public timeOver {
        //Any functionality which uses tokens.
    }

}
