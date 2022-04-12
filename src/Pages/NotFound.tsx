import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const [redirect, setRedirect] = useState<boolean>(false);

  document.title = "Not Found!"

  const handleGoBack = () => {
    setRedirect(true);
  }

  return (
    <div className="NotFoundPage">
      {redirect ? <Navigate to={"/"} /> : <></>}
      <h1>The page you requested was not found!</h1>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default NotFound;