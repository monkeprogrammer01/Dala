import React from "react";

function FolksMainImage({url}) {
    return (
        <div className="MainImage">
            <img src={url} alt="Народ" style={{ borderRadius: "10px", width: "400px", height: "400px" }} />
        </div>
    );
}

export default FolksMainImage;