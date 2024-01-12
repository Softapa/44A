/** @format */


if (typeof window.ethereum !== "undefined") {
  console.log("iske andar aa rha ha ");

  const connectWalletButton = document.getElementById("connectWalletButton");
  const walletAddressElement = document.getElementById("walletAddress");
  const twtr = document.getElementById("twitter_line");
  const twitterLin = document.getElementById("twitterLink");

  // connectWalletButton.style.display = 'none';

  twitterLin.addEventListener("click", () => {
    connectWalletButton.style.display = "inline-block";
    window.open(twitterLin.href, "_blank");
  });

  connectWalletButton.addEventListener("click", async () => {
    try {
      let account;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];

      const networkId = await window.ethereum.request({
        method: "net_version",
      });

      // Check if the connected wallet is on BSC (networkId '56')
      if (networkId !== "56") {
        alert("Please connect a Binance Smart Chain wallet.");
        return;
      }

      alert(`Connected to wallet!\nSelected account: ${account}`);
      console.log(account);
      twtr.style.display = "none";
      connectWalletButton.style.display = "none";
      walletAddressElement.textContent = `Connected Wallet: ${account}`;
      walletAddressElement.style.display = "inline-block";

      // Use bnb_getBalance to get BNB balance on BSC
      const balanceResult = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      console.log(balanceResult);
      let wei = parseInt(balanceResult, 16);

      // Convert BNB balance from Wei to BNB
      let balance = wei / 10 ** 18;
      console.log(balance + " BNB");
      alert(`Smart contract interaction successful! Balance: ${balance} BNB`);

      // DISCONNECT Logics
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

      // removing claim modal
      const clainForm = document.getElementById("claim-modal");
      clainForm.style.display = "none";

      // removing user icon
      const user = document.getElementById("user-modal");
      user.style.display = "none";

      // active logout btn
      const logout = document.getElementById("logout-user");
      logout.style.display = "block";
      // active address
      const userAddress = document.getElementById("user-address");
      userAddress.style.display = "block";
    } catch (error) {
      console.error("Error connecting to wallet:", error.message);
    }
  });
} else {
  alert(
    "MetaMask or another compatible wallet is not detected. Please install MetaMask or use a compatible wallet to connect."
  );
}
