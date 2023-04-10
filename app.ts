import { createPublicClient, http, formatUnits, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const RPC_URL = 'https://rpc.ankr.com/eth'

const client = createPublicClient({
  chain: mainnet,
  transport: http(RPC_URL),
})

const getBalance = async () => {
  const balance = await client.getBalance({
    address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
  })
  console.log('balance', balance)
  console.log('balance in ETH', formatUnits(balance, 18))
}

const connectContract = async () => {
  const ERC20ABI = parseAbi([
    'function symbol() public view returns (string)',
    'function decimals() public view returns (uint8)',
    'function totalSupply() public view returns (uint256)',
    'function balanceOf(address _owner) public view returns (uint256 balance)',
  ])

  const totalSupply = await client.readContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: ERC20ABI,
    functionName: 'totalSupply',
  })

  console.log('totalSupply', totalSupply)
  console.log('totalSupply in USDT', formatUnits(totalSupply, 6))
}

const start = async () => {
  await getBalance()
  await connectContract()
}

start()
  .then()
  .catch((err) => console.error(err))
