'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryFlag from "react-country-flag"; // Importar react-country-flag

// Import for API calls
import { useState, useEffect } from 'react';
export default function Home() {
  const [selectedCountry, setSelectedCountry] = React.useState("HN");
  const [selectedCrypto, setSelectedCrypto] = React.useState("ETH");
  const [amount, setAmount] = React.useState("");
  const [convertedAmount, setConvertedAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          baseCurrency: selectedCountry,
        }),
      });
      console.log('response', response);

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const data = await response.json();
      console.log('data', data);
      setConvertedAmount(data.toString().substring(0,8));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
<Card className="w-[350px] bg-white shadow-md rounded">
  <CardHeader>
    <CardTitle>Convertidor de Divisas</CardTitle>
    <CardDescription>Convierte tu moneda local a criptomoneda fácilmente.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="amount">Cantidad</Label>
          <Input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa la cantidad"
            type="number"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="country">Selecciona País</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger id="country">
              <SelectValue>
                <CountryFlag countryCode={selectedCountry} svg style={{ width: '2em', height: '2em' }} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="BZ"><CountryFlag countryCode="BZ" svg style={{ width: '2em', height: '2em' }} /> Belice</SelectItem>
              <SelectItem value="CR"><CountryFlag countryCode="CR" svg style={{ width: '2em', height: '2em' }} /> Costa Rica</SelectItem>
              <SelectItem value="SV"><CountryFlag countryCode="SV" svg style={{ width: '2em', height: '2em' }} /> El Salvador</SelectItem>
              <SelectItem value="GT"><CountryFlag countryCode="GT" svg style={{ width: '2em', height: '2em' }} /> Guatemala</SelectItem>
              <SelectItem value="HN"><CountryFlag countryCode="HN" svg style={{ width: '2em', height: '2em' }} /> Honduras</SelectItem>
              <SelectItem value="NI"><CountryFlag countryCode="NI" svg style={{ width: '2em', height: '2em' }} /> Nicaragua</SelectItem>
              <SelectItem value="PA"><CountryFlag countryCode="PA" svg style={{ width: '2em', height: '2em' }} /> Panamá</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="cryptocurrency">Selecciona Criptomoneda</Label>
          <Select value={selectedCrypto} onChange={setSelectedCrypto}>
            <SelectTrigger id="cryptocurrency">
              <SelectValue>{selectedCrypto}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
    {convertedAmount && (
      <div className="mt-4">
        <Label htmlFor="convertedAmount">Resultado: </Label>
        <span>
          {convertedAmount} {selectedCrypto}
        </span>
      </div>
    )}
  </CardContent>
  <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button 
          onClick={handleConvert}
          disabled={loading || !amount}>Convertir</Button>

  
  </CardFooter>

        
</Card>



    </div>
  );
}
