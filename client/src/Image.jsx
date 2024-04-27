// export default function Image({ src, ...rest }) {
//     src = src && src.includes('https://')
//         ? src
//         : 'http://localhost:4000/uploads/' + src;
//     return (
//         <img {...rest} src={src} alt={''} />
//     );
// }

// export default function Image({ src, ...rest }) {
//     src = src && (src.startsWith('https://') || src.startsWith('http://'))
//         ? src
//         : 'https://firebasestorage.googleapis.com/v0/b/voyesta-ef64d.appspot.com/o/' + src + '?alt=media';
//     return (
//         <img {...rest} src={src} alt={''} />
//     );
// }

export default function Image({ src, ...rest }) {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/voyesta-ef64d.appspot.com/o/';
    src = src && src.includes('https://')
    ? src 
    : `${baseUrl}/uploads/${src}`
    return (
        <img{...rest} src={src} alt={''} />
    )
}