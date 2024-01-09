/** @format */

if (typeof window.ethereum !== 'undefined') {
  const connectWalletButton = document.getElementById('connectWalletButton');
  const walletAddressElement = document.getElementById('walletAddress');
  const twtr = document.getElementById('twitter_line');
  const twitterLin = document.getElementById('twitterLink');

  connectWalletButton.style.display = 'none';

  twitterLin.addEventListener('click', () => {
    connectWalletButton.style.display = 'inline-block';
    window.open(twitterLin.href, '_blank');
  });

  connectWalletButton.addEventListener('click', async () => {
    try {
      let account;
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      account = accounts[0];

      const networkId = await window.ethereum.request({
        method: 'net_version',
      });

      // Check if the connected wallet is on BSC (networkId '56')
      if (networkId !== '56') {
        alert('Please connect a Binance Smart Chain wallet.');
        return;
      }

      alert(`Connected to wallet!\nSelected account: ${account}`);
      console.log(account);
      twtr.style.display = 'none';
      connectWalletButton.style.display = 'none';
      walletAddressElement.textContent = `Connected Wallet: ${account}`;
      walletAddressElement.style.display = 'inline-block';

      // Use bnb_getBalance to get BNB balance on BSC
      const balanceResult = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      console.log(balanceResult);
      let wei = parseInt(balanceResult, 16);

      // Convert BNB balance from Wei to BNB
      let balance = wei / 10 ** 18;
      console.log(balance + ' BNB');
      alert(`Smart contract interaction successful! Balance: ${balance} BNB`);
    } catch (error) {
      console.error('Error connecting to wallet:', error.message);
    }
  });
} else {
  alert(
    'MetaMask or another compatible wallet is not detected. Please install MetaMask or use a compatible wallet to connect.'
  );
}






