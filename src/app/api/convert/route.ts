import { NextResponse } from "next/server";

// Replace with your actual API key
const currencyAPIKey = 'cur_live_OHHHkRRvp4grH2XtvvfPOnlaaOt9POIIx3lmzJL7';

// Function to handle POST requests
export async function POST(req: Request) {


  try {
    const { amount, baseCurrency } = await req.json();
    
    console.log('amount', amount);
    console.log('baseCurrency', baseCurrency);

    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=${currencyAPIKey}&currencies=USD&base_currency=${baseCurrency}`
    );
    const data = await response.json();
    console.log('data', data);
    const rate = data.data.USD.value;
    console.log('rate', rate);
    const amountInUSD = amount * rate;

    // Hardcoded ETH price for the example
    const ethPrice = 3500;
    const amountInETH = amountInUSD / ethPrice;

    return NextResponse.json(amountInETH );

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
