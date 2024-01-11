const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = 3000;

// Connect to Ethereum using Infura (replace YOUR_INFURA_API_KEY with your actual API key)
const provider = new ethers.providers.JsonRpcProvider('');

const contractAddress = '';
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "distributeToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lockTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unlockTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "unwhitelistAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "whitelistAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWhitelistedAccounts",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contract = new ethers.Contract(contractAddress, abi, provider);
app.use(express.json());

// API endpoints

app.post('/mint', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }
    const { to, amount } = req.body;
    try {
        // const tx = await contract.mint(to, amount);
        // const receipt = await tx.wait();

        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);

        const tx = await contractWithSigner.mint(to, amount, { from: senderAddress });

        const receipt = await tx.wait();

        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mint tokens', details: error.message });
    }
});

app.post('/whitelistAccount', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }

    const { account } = req.body;

    try {
        const fetchedOwnerAddress = await fetchOwnerAddress();
        
        if (senderAddress.toLowerCase() !== fetchedOwnerAddress.toLowerCase()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.whitelistAccount(account ,{ from: senderAddress });

        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to whitelist account', details: error.message });
    }
});

app.post('/unwhitelistAccount', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }
    const { account } = req.body;
    try {
        const fetchedOwnerAddress = await fetchOwnerAddress();
        
        if (senderAddress.toLowerCase() !== fetchedOwnerAddress.toLowerCase()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.unwhitelistAccount(account ,{ from: senderAddress });

        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to unwhitelist account', details: error.message });
    }
});

app.get('/getWhitelistedAccounts', async (req, res) => {
    try {
        const whitelistedAccounts = await contract.getWhitelistedAccounts();
        res.json({ whitelistedAccounts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get whitelisted accounts', details: error.message });
    }
});

app.post('/distributeToWhitelist', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }

    const { amount } = req.body;
    try {
        const fetchedOwnerAddress = await fetchOwnerAddress();
        
        if (senderAddress.toLowerCase() !== fetchedOwnerAddress.toLowerCase()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.distributeToWhitelist(amount ,{ from: senderAddress });

        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to distribute tokens', details: error.message });
    }
});

app.post('/lockTransfer', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }

    try {
        const fetchedOwnerAddress = await fetchOwnerAddress();
        
        if (senderAddress.toLowerCase() !== fetchedOwnerAddress.toLowerCase()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.lockTransfer({ from: senderAddress });
        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to lock token transfers', details: error.message });
    }
});

app.post('/unlockTransfer', async (req, res) => {
    const senderAddress = req.headers.senderaddress || req.body.senderAddress;

    if (!senderAddress) {
        return res.status(400).json({ error: 'Sender address not provided' });
    }

    try {
        const fetchedOwnerAddress = await fetchOwnerAddress();
        
        if (senderAddress.toLowerCase() !== fetchedOwnerAddress.toLowerCase()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const privateKey = '';
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.unlockTransfer({ from: senderAddress });
        const receipt = await tx.wait();
        res.json({ transactionHash: receipt.transactionHash });
    } catch (error) {
        res.status(500).json({ error: 'Failed to unlock token transfers', details: error.message });
    }
});



async function fetchOwnerAddress() {
    try {
        const fetchedOwnerAddress = await contract.owner();
        return fetchedOwnerAddress;
    } catch (error) {
        console.error("Failed to fetch owner address:", error.message);
        throw new Error("Failed to fetch owner address");
    }
}
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
