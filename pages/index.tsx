import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from "@meshsdk/react";
import { CardanoWallet } from "@meshsdk/react";
import { AssetMetadata, ForgeScript, Mint, Transaction } from "@meshsdk/core";

const Home: NextPage = () => {
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const { wallet, connected, name, disconnect } = useWallet();

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  async function getNFT() {
    if (wallet) {
      setLoading(true);
      const usedAddress = await wallet.getUsedAddresses();
      const address = usedAddress[0];

      const forgingScript = ForgeScript.withOneSignature(address);

      const assetMetadata: AssetMetadata = {
        name: "VanTuan NFT Pro",
        image: "ipfs://Qmbj8GM7CU4ZniDhYxXed3xeQrixXSvTC7mLtmLReypEwF",
        mediaType: "image/jpg",
        description: "This NFT was minted by Mesh (https://meshjs.dev/).",
      };

      const asset: Mint = {
        assetName: "VanTuan NFT Pro",
        assetQuantity: "7",
        metadata: assetMetadata,
        label: "721",
        recipient: address,
      };

      const tx = new Transaction({ initiator: wallet });
      tx.mintAsset(forgingScript, asset);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setLoading(false);
    }
  }

  async function sendADA() {
    if (wallet) {
      setLoading(true);
      const tx = new Transaction({ initiator: wallet }).sendLovelace(
        recipientAddress,
        "7000000000"
      );
      try {
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);
        alert("Giao dịch thành công!");
        console.log("Transaction hash:", txHash);
      } finally {
        setLoading(false);
      }
    }
  }

  const Header = () => (
    <header className="header">
      <div className="header__navbar">
        <h2 className="header__navbar-icon">HeritageChain</h2>
        <div className="header__navbar-navigate">
        <a href="" className="header__navbar-navigate--page">Home</a>
        <a href="" className="header__navbar-navigate--page">Wallet</a>
        <a href="" className="header__navbar-navigate--page">Dedicated</a>
        <a href="" className="header__navbar-navigate--page">About Us</a>
        </div>
        <button className="header__navbar-login">
          Login
        </button>
      </div>
      <div className="header__textAndImage">
        <div className="header__textAndImage-text">
          <h1 className="header__textAndImage-text--one">
            Empowering Businesses with Trusted Climate Solutions
          </h1>
          <p className="header__textAndImage-text-two">
            We connect businesses with verified tree planting projects to
            restore our planet. We exist to create local jobs, sequester carbon,
            and restore ecosystems.
          </p>
        </div>
        <div className="header__textAndImage-image">
          <img
            className="header__textAndImage-image--link"
            src="/Home-page_900x900.png"
            alt="Anh mo phong HeritageChain"
          />
        </div>
      </div>
      <button type="button" className="header__buttton" onClick={() => setShowWallet(true)}>
        Get Started
      </button>
    </header>
  );

  const MissionCard = ({
    imgSrc,
    title,
    description,
  }: {
    imgSrc: string;
    title: string;
    description: string;
  }) => (
    <div className="mission-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#" className="read-more">
        Read More →
      </a>
    </div>
  );

  const Container = () => (
    <div className="container">
      <div className="container__descript">
        <h2>About HeritageChain</h2>
        <p>
          HeritageChain is a resource network for unlocking the potential of Africa &
          Diaspora with Distributed Ledger Technology, Artificial Intelligence,
          and Automation.
        </p>
      </div>
      <div className="mission-cards">
        <MissionCard
          imgSrc="https://i.ibb.co/Z2F189f/infrastructure.png"
          title="Infrastructure"
          description="Wada seeks to support local innovation hubs throughout Africa and the African diaspora."
        />
        <MissionCard
          imgSrc="https://i.ibb.co/y6gY7t6/education.png"
          title="Education"
          description="Our hubs focus on bridging access to frontier technologies, delivered to local communities through workshops and events."
        />
        <MissionCard
          imgSrc="https://i.ibb.co/hY4v55P/innovation.png"
          title="Innovation"
          description="Through our network of developers, we provide consulting and support for new products and DApps."
        />
      </div>
    </div>
  );

  const Footer = () => (
    <footer>
      <div className="end">
        <div className="footer__navbar-linkus">
          <h2 className="footer__navbar-logo">HeritageChain</h2>
          <ul className="footer__navbar-info footer__navbar-info--noflex">
            <li><a href="#" className="footer__navbar-info--noflex"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="footer__navbar-info--noflex"><i className="fab fa-linkedin-in"></i></a></li>
            <li><a href="#" className="footer__navbar-info--noflex"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.youtube.com/" className="footer__navbar-info--noflex"><i className="fab fa-youtube"></i></a></li>
            <li><a href="#" className="footer__navbar-info--noflex"><i className="fab fa-telegram-plane"></i></a></li>
            <li><a href="#" className="footer__navbar-info--noflex"><i className="fab fa-discord"></i></a></li>
          </ul>
        </div>
        <div className="footer__navbar-link">
          <h3 className="footer__navbar-title">Link</h3>
          <ul className="footer__navbar-info">
            <li className="footer__social-link footer__social-link--flex">Overons</li>
            <li className="footer__social-link footer__social-link--flex">Counters</li>
            <li className="footer__social-link footer__social-link--flex">Blog</li>
            <li className="footer__social-link footer__social-link--flex">FAQ</li>
          </ul>
        </div>
                <div className="footer__navbar-company">
          <h3 className="footer__navbar-title">Company</h3>
          <ul className="footer__navbar-info">
            <li className="footer__social-link footer__social-link--flex">Terms & Conditions</li>
            <li className="footer__social-link footer__social-link--flex">Privacy Policy</li>
            <li className="footer__social-link footer__social-link--flex">Contact</li>
            <li className="footer__social-link footer__social-link--flex">Careers</li>
          </ul>
        </div>
        <div className="footer__navbar-getintouch fix">
          <h3 className="footer__navbar-title">Get in touch</h3>
          <ul className="footer__navbar-info">
            <li className="footer__social-link footer__social-link--flex">
              <i className="fas fa-map-marker-alt"></i> Crechterwoord K12 182 DK Alknjkcb
            </li>
            <li className="footer__social-link footer__social-link--flex">
              <i className="fas fa-phone"></i> 085-132567
            </li>
            <li className="footer__social-link footer__social-link--flex">
              <i className="fas fa-envelope"></i> info@heritagechain.net
            </li>
          </ul>
        </div>
      </div>
      <div className="line"></div>
    </footer>
  );

  return (
    <>
      <Header />
      <Container />
      {showWallet && (
        <div className="connect-wallet-container">
          <div className="overlay" onClick={() => setShowWallet(false)}></div>
          <div className="connect-wallet-modal">
            <label className="check">
                <input type="checkbox" className="terms-checkbox" />
                By checking this box and connecting my wallet, I confirm <br/> that I have read, understood, and agreed to the
                Terms and Conditions
            </label>
            <button className="close-button" onClick={() => setShowWallet(false)}>X</button>
            <CardanoWallet />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;

