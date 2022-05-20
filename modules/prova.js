// export default function pincoPallino(param1) {
//   let b = "ciaooo";
//   let a = param1;

//   return { funzioneProva, funzioneProva2 };

//   function funzioneProva() {
//     console.log(a);
//   }

//   function funzioneProva2() {
//     console.log(b);
//   }
// }

let b = "ciaooo";

export default function pincoPallino(param1) {
  // let b = "cione";
  this.a = param1;
}

pincoPallino.prototype.funzioneProva = function () {
  console.log(this.a);
};

pincoPallino.prototype.funzioneProva2 = function () {
  console.log(b);
};

// export default function pincoPallino(param1) {
//   let b = "ciao bello";
//   this.a = "ciaone";
// }

// pincoPallino.prototype.
