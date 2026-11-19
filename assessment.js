'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      return;
    }
    
    resultDivision.innerText = '';
    
    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('私の術式') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #私の術式';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

const answers = [
  '###userName###の術式は無下限呪術です。空間そのものを操り、相手との間に無限の距離を生み出すことができます。攻撃を寄せ付けない防御力と、強力な攻撃力を兼ね備えています。',
'###userName###の術式は十種影法術です。影を媒介にして十種類の式神を召喚し、それぞれの能力を使い分けることができます。状況に応じて戦い方を変えられる万能な術式です。',
'###userName###の術式は芻霊呪法です。藁人形と金槌、釘を使い、対象の一部を通して離れた場所から攻撃することができます。相手の弱点を突く戦い方が得意です。',
'###userName###の術式は呪言です。言葉に呪力を込めることで、発した言葉の内容を相手に強制できます。強力な命令を出せますが、相手が強いほど術者への負担も大きくなります。',
'###userName###の術式は模倣です。他者の術式をコピーして、自分の能力として使用することができます。さまざまな術式を使い分けられる、非常に高い可能性を秘めた術式です。',
'###userName###の術式は十劃呪法です。対象を七対三の比率で分割し、その境目を弱点として攻撃できます。相手の強さに関係なく、的確に急所を狙うことができます。',
'###userName###の術式は黒鳥操術です。カラスを自在に操り、視覚を共有したり、遠くの様子を探ったりできます。カラスに呪力を集中させることで、強力な攻撃を放つこともできます。',
'###userName###の術式は星の怒りです。自分や式神に仮想の質量を追加し、攻撃力や破壊力を大幅に高めることができます。圧倒的な力で相手をねじ伏せる術式です。',
'###userName###の術式は不義遊戯です。手を叩くことで、一定の条件を満たした対象同士の位置を入れ替えることができます。相手の予想を裏切り、戦況を一気に変えることが得意です。',
'###userName###の術式は赤血操術です。自分の血液を自在に操り、弾丸のように飛ばしたり、身体能力を高めたりできます。攻撃と防御の両方に優れた術式です。',
'###userName###の術式は付喪操術です。箒などの道具に呪力を込めて自在に操ることができます。身近な道具を利用して、空中移動や攻撃を行える術式です。',
'###userName###の術式は傀儡操術です。遠隔操作できる傀儡を操り、離れた場所から攻撃や情報収集を行うことができます。複数の傀儡を使い分けることで、さまざまな戦術を展開できます。',
'###userName###の術式は構築術式です。呪力を消費して、無から物質を作り出すことができます。生み出す物質によって戦い方を大きく変えられる、創造力が試される術式です。',
'###userName###の術式は投射呪法です。あらかじめ決めた動きを一秒間に二十四分割し、その動きを実現することで高速移動できます。動きを読み切れない相手を翻弄することが得意です。',
'###userName###の術式は星間飛行です。対象に星座のようなルールを設定し、そのルールに従って動きを制限することができます。相手の行動を封じ、戦闘を有利に進められる術式です。',
'###userName###の術式は超人です。自分の頭の中で面白いと確信したイメージを現実にすることができます。予測不能な発想で、常識を超えた現象を引き起こせる術式です。',
'###userName###の術式は不死の術式です。自分自身の不死を実現し、長い年月を生き続けることができます。ただし、不死であっても老化や進化を完全に防げるわけではありません。',
'###userName###の術式は幻獣琥珀です。自分の身体を電気的な性質へと変化させ、電気や電磁気を利用した攻撃を繰り出すことができます。圧倒的な火力を誇る一方、一回限りの術式です。',
'###userName###の術式は御廚子です。斬撃を自在に操り、対象に合わせて切断の威力を調整できます。目にも止まらない斬撃で、あらゆるものを切り裂くことができます。',
'###userName###の術式は呪霊操術です。取り込んだ呪霊を自在に操り、それぞれが持つ能力を利用できます。多種多様な呪霊を使い分けることで、幅広い戦術を展開できます。',
'###userName###の術式は無為転変です。相手の魂の形を変えることで、それに対応する肉体の形も変化させることができます。触れた相手の身体を自在に変形させる、非常に危険な術式です。',
'###userName###の術式は氷凝呪法です。強力な氷を生み出して自在に操り、広範囲を凍結させたり、敵の動きを封じたりすることができます。',
'###userName###の術式は蝕爛腐術です。対象に毒のような効果を与え、血液を通じて身体を腐食させることができます。相手の体内からダメージを与える、危険な術式です。',
'###userName###の術式は邪去侮の梯子です。光の柱を降らせ、触れた対象の術式を消滅させることができます。呪術そのものを無効化する、非常に強力な能力です。',
'###userName###の術式は反重力機構です。重力を打ち消す力を発生させ、周囲にかかる重力の影響を弱めたり、反転させたりできます。防御にも攻撃にも応用できる術式です。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###',userName)
  return result;
}