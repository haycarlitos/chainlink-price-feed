import { NextResponse } from "next/server";

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
    const ethPrice = 3500;
    const amountInETH = amountInUSD / ethPrice;
    console.log('amountInETH', amountInETH);
    

    return NextResponse.json( amountInETH);

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
