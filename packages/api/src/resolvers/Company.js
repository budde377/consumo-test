export default {
  logo ({id}) {
    const size = 512
    return {
      url: `https://api.adorable.io/avatars/${size}/${encodeURIComponent(id)}.png`,
      width: size,
      height: size
    }
  }
}
