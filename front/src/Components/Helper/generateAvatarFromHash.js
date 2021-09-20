import tinycolor from 'tinycolor2';

let getCorrectIndex = (number)=>{

    return number > 255 ? 255 : number < 0 ? 0 : number
}

export default hash => {

    let [r, g, b] = hash
        .substr(9,12)
        .split('')
        .map(char => getCorrectIndex(char.charCodeAt(0)))

    return{
        color: tinycolor({r,g,b})
            .toHexString(),
        colorLighten:  tinycolor({r,g,b})
            .lighten(40)
            .saturate(50)
            .toHexString()
    }

}