import React from "react";

const TryFirebase = () => {
  React.useEffect(() => {
    fetch("https://firestore-ccb06-default-rtdb.firebaseio.com/req.json")
      .then((response) => response.json())
      .then((data) => {
        const keys = Object.keys(data);
        keys.map((key) => {
          console.log(data[key]);
        });
      });
  }, []);

  const insertHandler = () => {
    const data = {
      name: "ahmed",
      age: 55,
    };
    fetch("https://firestore-ccb06-default-rtdb.firebaseio.com/req.json", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      TryFirebase
      <div>
        <button onClick={insertHandler}>Insert</button>
      </div>
    </div>
  );
};

export default TryFirebase;
