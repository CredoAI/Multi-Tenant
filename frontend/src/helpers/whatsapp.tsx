// import { useEffect } from 'react';

// export default function App() {
//   useEffect(() => {
//     const handler = (event: MessageEvent) => {
//       // Only accept messages from Facebook domains
//       console.log('====================================');
//       console.log(event.data, event.origin);
//       console.log('====================================');
//       if (!event.origin.includes('facebook.com')) return;

//       try {
//         const data = JSON.parse(event.data);
//         if (data.type === 'WA_EMBEDDED_SIGNUP') {
//           console.log('📩 Embedded Signup Event:', data);

//           if (data.event === 'FINISH') {
//             console.log('✅ Signup Finished, session data:', data.data);
//           }
//         }
//       } catch (err) {
//         console.log('⚠️ Non-JSON event data:', event.data);
//       }
//     };

//     window.addEventListener('message', handler);

//     return () => {
//       window.removeEventListener('message', handler);
//     };
//   }, []);

// //   <script>
// //   window.fbAsyncInit = function() {
// //     FB.init({
// //       appId            : '2512895449065253',
// //       autoLogAppEvents : true,
// //       xfbml            : true,
// //       version          : 'v23.0'
// //     });
// //   };
// // </script>
// // <script async defer crossorigin="anonymous"
// //   src="https://connect.facebook.net/en_US/sdk.js">
// // </script>

//   const fbLoginCallback = (response:any) => {
//   if (response.authResponse) {
//     const code = response.authResponse.code;
//     // The returned code must be transmitted to your backend first and then
//     // perform a server-to-server call from there to our servers for an access token.
//   }
// }

//   const launchWhatsAppSignup = () => {
//   // Launch Facebook login
//   FB.login(fbLoginCallback, {
//     config_id: '1158191393004399', // configuration ID goes here
//     response_type: 'code', // must be set to 'code' for System User access token
//     override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
//     extras: {"version":"v3"}
//   });
// }

//   return (
//     <div>
//       <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 4px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; height: 40px; padding: 0 24px;">Login with Facebook</button>
//       <h1>WhatsApp Embedded Signup Capture</h1>
//       <p>Run your signup flow from backend → redirect into this page → session log events will print in the console.</p>
//     </div>
//   );
// }
