import { Lotto, LottoStore } from '../../src/domain/Lotto.js';

const AMOUNT = 8000;
const PRICE = 1000;
const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
const DRAWING_NUMBERS = {
  winningNumbers: [1, 2, 3, 4, 5, 6],
  bonusNumber: 7,
};

const generateLotto = (count) =>
  Array(count)
    .fill()
    .map(() => new Lotto(LOTTO_NUMBERS, DRAWING_NUMBERS));

describe('로또', () => {
  test('구입 금액만큼 로또를 구매한다', () => {
    const lottoList = LottoStore.purchase(AMOUNT);

    expect(lottoList.length).toBe(AMOUNT / PRICE);
  });

  test('로또 번호와 당첨 번호를 비교하여 당첨 결과를 확인한다', () => {
    const [lotto] = generateLotto(1);

    const result = LottoStore.draw(lotto);

    expect(result).toBe('6');
  });
});
