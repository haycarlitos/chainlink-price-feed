import { NextResponse } from "next/server";
//import { Provider, Contract, BigNumberish } from 'ethers'
import {Web3} from 'web3'

const web3 = new Web3('https://scroll-sepolia.drpc.org')
//const provider = new Provider.JsonRpcProvider("https://scroll-sepolia.drpc.org	")
const aggregatorV3InterfaceABI = [{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"},{"internalType":"address","name":"_accessController","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"int256","name":"current","type":"int256"},{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedAt","type":"uint256"}],"name":"AnswerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"roundId","type":"uint256"},{"indexed":true,"internalType":"address","name":"startedBy","type":"address"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"NewRound","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"accessController","outputs":[{"internalType":"contract AccessControllerInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aggregator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"confirmAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_roundId","type":"uint256"}],"name":"getTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"phaseAggregators","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"phaseId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_aggregator","type":"address"}],"name":"proposeAggregator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proposedAggregator","outputs":[{"internalType":"contract AggregatorV2V3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"proposedGetRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proposedLatestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_accessController","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
// Direcciones de los contratos de Chainlink para obtener el precio de las criptomonedas
const rateAddresses = {
  'ETH': '0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41',
  'USDC': '0xFadA8b0737D4A3AE7118918B7E69E689034c0127',
  'USDT': '0xb84a700192A78103B2dA2530D99718A2a954cE86'
};
// Definimos una interfaz para el tipo de respuesta que esperamos de Chainlink
interface ChainlinkResponse {
  roundId: bigint;
  answer: bigint;
  startedAt: bigint;
  updatedAt: bigint;
  answeredInRound: bigint;
}
// Función para obtener el último precio de una criptomoneda dada su dirección de contrato
async function getLatestPrice(contractAddress: string): Promise<number> {
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, contractAddress);
  const latestRoundData = await priceFeed.methods.latestRoundData().call() as ChainlinkResponse;
  return Number(latestRoundData.answer) / 1e8; // El precio se escala por 1e8
}



const currencyAPIKey = process.env.CURRENCY_API_KEY;
// Definimos un tipo para las claves de nuestro diccionario de códigos de moneda
type CountryCode = "BZ" | "CR" | "SV" | "GT" | "HN" | "NI" | "PA";

// Usamos el tipo CountryCode para asegurarnos de que solo estas claves sean válidas
const currencyCodes: Record<CountryCode, string> = {
  "BZ": "BZD", // Dólar de Belice
  "CR": "CRC", // Colón costarricense
  "SV": "USD", // Dólar estadounidense (El Salvador usa el dólar)
  "GT": "GTQ", // Quetzal guatemalteco
  "HN": "HNL", // Lempira hondureña
  "NI": "NIO", // Córdoba nicaragüense
  "PA": "PAB", // Balboa panameño
};

// Function to handle POST requests
export async function POST(req: Request) {
  try {
    const { amount, baseCurrency, cryptoCurrency } = await req.json();
    console.log('amount', amount);
    console.log('baseCurrency', baseCurrency);
    console.log('cryptoCurrency', cryptoCurrency);
    
    // Verificamos que baseCurrency sea una clave válida antes de usarla
    if (!(baseCurrency in currencyCodes)) {
      return new NextResponse("Invalid base currency", { status: 400 });
    }

        // Verificar validez de la criptomoneda
        if (!(cryptoCurrency in rateAddresses)) {
          return new NextResponse("Invalid cryptocurrency", { status: 400 });
        }
  
      const contractAddress = rateAddresses[cryptoCurrency as keyof typeof rateAddresses];
      const cryptoPrice = await getLatestPrice(contractAddress);
    
    // Ahora sabemos que baseCurrency es una clave válida, por lo que el acceso es seguro
    const currencyCode = currencyCodes[baseCurrency as CountryCode];
    console.log('currencyCode', currencyCode);
    
    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${currencyAPIKey}&currencies=USD&base_currency=${currencyCode}`
    );
    const data = await response.json();
    console.log('data', data);
    
    const rate = data.data.USD.value;
    console.log('rate', rate);
    //const rate = 0.03;
    const amountInUSD = amount * rate;

    // Hardcoded ETH price for the example
    const amountInCrypto = amountInUSD / cryptoPrice;
    

    return NextResponse.json( amountInCrypto);

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
