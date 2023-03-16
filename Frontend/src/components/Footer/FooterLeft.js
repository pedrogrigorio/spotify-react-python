import TextRegularM from '../text/BasicTextManager';
import styles from "../Styles/footer-left.module.css";

export default function FooterLeft(props) {
    return (
        <div className={styles.footerLeft}>
           <ImgBox 
                SrcImg={props.img}
           /> 
           <BoxSongDetails 
                SrcTitle={props.title}
                SrcArtist={props.artist}
           />
        </div>
    )
}

function ImgBox(props) {
    return (
        <div className={styles.imgBox}>
            <img src={props.SrcImg} alt="Song Image"/>
        </div>
    )
}

function BoxSongDetails(props) {
    return (
        <div className={styles.songDetails}>
            <TextRegularM text={props.SrcTitle} /> 
            <TextRegularM text={props.SrcArtist} /> 
        </div>
    )
}