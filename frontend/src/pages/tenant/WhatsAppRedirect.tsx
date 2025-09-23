import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function WhatsAppRedirect() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Processing...');

  useEffect(() => {
    const code = searchParams.get('code');
    const signedRequest = searchParams.get("signed_request");
    if (!code) {
      setStatus('Missing signup parameters');
      return;
    }
    console.log('================code====================');
    console.log(code, signedRequest);
    console.log('====================================');
    // Send to backend to exchange code for token
    // (async () => {
    //   try {
    //     setStatus('WhatsApp business connected successfully ✅');
    //   } catch (err: any) {
    //     setStatus(`Error: ${err.message}`);
    //   }
    // })();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold">WhatsApp Redirect</h1>
      <p>{status}</p>
    </div>
  );
}
