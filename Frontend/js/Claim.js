/** @format */

const Backendurl = "http://localhost:5000/api/v2/user";
if (typeof window.ethereum !== "undefined") {
  const connectWalletButton = document.getElementById("connectWalletButton");
  const walletAddressElement = document.getElementById("walletAddress");
  const twtr = document.getElementById("twitter_line");
  const twitterLin = document.getElementById("twitterLink");

  twitterLin.addEventListener("click", () => {
    window.open(twitterLin.href, "_blank");
  });

  connectWalletButton.addEventListener("click", async () => {
    try {
      const clainForm = document.getElementById("claim-modal");
      clainForm.style.display = "none";

      var inputElement = document.getElementById("Xhandle-InputField");
      var inputValue = inputElement.value;
      console.log("Input Value:", inputValue);

      let account;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];

      const networkId = await window.ethereum.request({
        method: "net_version",
      });

      if (networkId !== "56") {
        alert("Please connect a Binance Smart Chain wallet.");
        return;
      }

      twtr.style.display = "none";
      walletAddressElement.style.display = "inline-block";

      const balanceResult = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      console.log(balanceResult);
      let wei = parseInt(balanceResult, 16);

      const logoutBtn = document.getElementById("logout-user");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          localStorage.removeItem("loginid");
          const user = document.getElementById("user-modal");
          user.style.display = "none";
          const buttonContainer = document.getElementById("AuthContainer");
          buttonContainer.style.display = "block";
          window.location.href = "/";
        });
      }

      localStorage.setItem("address", account);
      const user = document.getElementById("user-modal");
      user.style.display = "none";

      const logout = document.getElementById("logout-user");
      logout.style.display = "block";

      const userAddress = document.getElementById("user-address");

      userAddress.textContent = ` ${account}`;

      if (userAddress.textContent.length > 5) {
        userAddress.textContent =
          userAddress.textContent.substring(0, 12) + "...";
      }
      userAddress.style.display = "block";

      alert(`Connected to wallet!\nSelected account: ${account}`);
      console.log(account);

      let balance = wei / 10 ** 18;
      console.log(balance + " BNB");
      alert(`Smart contract interaction successful! Balance: ${balance} BNB`);

      const UserId = localStorage.getItem("loginid").replaceAll('"', "");

      const Xhandle = inputValue;
      const WalletAddress = account;

      var body = {
        Xhandle,
        WalletAddress,
      };

      const url = `${Backendurl}/info/${UserId}`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("user Claim Info: ",data)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error connecting to wallet:", error.message);
    }
  });
} else {
  alert(
    "MetaMask or another compatible wallet is not detected. Please install MetaMask or use a compatible wallet to connect."
  );
}
