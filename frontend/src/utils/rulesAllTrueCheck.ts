export default function rulesAllTrueCheck(matriz: boolean[][]) {
    for (let i = 0; i < matriz.length-1; i++) {

      for (let j = 0; j < matriz[i].length; j++) {

        if (!matriz[i][j]) {

          return false
        }
      }
    }
    return true
}