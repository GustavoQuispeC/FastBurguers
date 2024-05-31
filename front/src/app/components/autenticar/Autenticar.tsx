"use client";

import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Image from "next/image";

const Autenticar = () => {
  const [user, setUser] = useState<{ name: string; imageUrl: string } | null>(
    null
  );
  const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const appID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";

  const onGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credentialResponse.credential}`
      );
      const profile = await response.json();
      setUser({ name: profile.name, imageUrl: profile.picture });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const onFailure = (error: any) => {
    console.log("Login Failed:", error);
    alert(`Login Failed: ${error.error}`);
  };

  const onFacebookSuccess = (response: any) => {
    console.log(response);
    const { name, picture } = response;
    const imageUrl = picture ? picture.data.url : "";
    setUser({ name, imageUrl });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!clientID) {
    return <div>Error: Client ID not found</div>;
  }

  return (
    <div>
      {!user ? (
        <GoogleOAuthProvider clientId={clientID}>
          <div className="flex justify-around items-center">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => {
                onFailure;
              }}
              useOneTap
              type="icon"
            />
            <div>
              <FacebookLogin
                appId={appID}
                autoLoad={false}
                onFail={onFailure}
                onProfileSuccess={onFacebookSuccess}
                render={(renderProps: any) => (
                  <button onClick={renderProps.onClick}>
                    <Image
                      src="/facebook.png"
                      alt="facebook"
                      width={30}
                      height={30}
                    />
                  </button>
                )}
              />
            </div>
          </div>
        </GoogleOAuthProvider>
      ) : (
        <div>
          <h3>Bienvenido, {user.name}</h3>
          {user.imageUrl && <img src={user.imageUrl} alt={user.name} />}
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default Autenticar;
