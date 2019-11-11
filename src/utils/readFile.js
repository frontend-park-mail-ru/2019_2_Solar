/**
 * Show file
 * @param {*} e
 * @param {*} imgID
 */
export default function showFile(e, imgID) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const img = document.getElementById(imgID);
    reader.onload = (event) => {
        img.setAttribute('src', event.target.result);
    };
    reader.readAsDataURL(file);
}
