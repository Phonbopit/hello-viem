import {
  createPublicClient,
  http,
  formatUnits,
  parseAbi,
  decodeEventLog,
} from 'viem'
import { mainnet } from 'viem/chains'
import { parseAbiItem } from 'abitype'

const RPC_URL = 'https://rpc.ankr.com/eth'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'

const ERC20ABI = [
  'event Transfer(address indexed _from, address indexed _to, uint256 _value)',
]

const client = createPublicClient({
  chain: mainnet,
  transport: http(RPC_URL),
})
const unwatch = client.watchContractEvent({
  address: USDT,
  abi: parseAbi(ERC20ABI),
  eventName: 'Transfer',
  onLogs: (logs) => {
    const args = logs.map(({ args }) => args)
    console.log('args', args)
  },
})

// unsubscribe
// unwatch()

// const topics = decodeEventLog({
//   abi: parseAbi(ERC20ABI),
//   data: '0x0000000000000000000000000000000000000000000000000000000236d46f54',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x000000000000000000000000efe00f74614cdf683ce5f95e0743b9869de05c1a',
//     '0x00000000000000000000000074de5d4fcbf63e00296fd95d33236b9794016631',
//   ],
// })

// console.log('topics', topics)
