let web3;
let contract;
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your deployed contract address
const contractABI = [
    // Your contract ABI here (you can get this from Remix)
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
];

async function connectWallet() {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        document.getElementById('status').innerText = "Wallet connected!";
        document.getElementById('withdrawButton').disabled = false;
    } else {
        alert('Please install MetaMask!');
    }
}

async function withdraw() {
    const accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        await contract.methods.withdraw().send({ from: accounts[0] });
        alert('Withdrawal successful!');
    } catch (error) {
        console.error(error);
        alert('Withdrawal failed. Check console for details.');
    }
}

document.getElementById('connectButton').onclick = connectWallet;
document.getElementById('withdrawButton').onclick = withdraw;
