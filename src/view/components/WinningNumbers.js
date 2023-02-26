import Component from './Component.js';
import Validator from '../../validator/step2/index.js';
import { getFields } from '../../utils/domHelper.js';
import { LOTTO } from '../../constants/values.js';

export default class WinningNumbers extends Component {
  setEvent() {
    this.addEvent('submit', '.lotto-store__win-numbers-form', this.handleSubmitForm.bind(this));
  }

  template() {
    return `
      <div class='lotto-store__win-numbers-desc'>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
      <form class='lotto-store__win-numbers-form'>
        <div class='lotto-store__drawing-numbers'>
          <div class='lotto-store__win-numbers-input-box'>
            <label class='lotto-store__win-numbers-label'>당첨 번호</label>
            <ul class='lotto-store__win-numbers-list'>
              ${this.getWinningNumbersInputTemplate()}
            </ul>
          </div>
          <div class='lotto-store__bonus-number-input-box'>
            <label class='lotto-store__bonus-number-label'>보너스 번호</label>
            <input name='bonus-number-input' type='number' min='1' max='45' required/>
          </div>
        </div>
        <button class='lotto-store__draw-btn' type='submit'>결과 확인하기</button>
      </form>
    `;
  }

  getWinningNumbersInputTemplate() {
    return Array(LOTTO.LOTTO_COUNT)
      .fill()
      .map(
        (_, i) => `
          <li class='lotto-store__win-number-list'>
            <input name='win-number-input-${i}' type='number' min='1' max='45' required/>
          </li>`
      )
      .join('');
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const fields = getFields(e.target);
    const drawingNumbers = { winningNumbers: [], bonusNumber: 0 };

    Object.entries(fields).forEach(([name, value]) => {
      if (name.includes('win-number')) drawingNumbers.winningNumbers.push(Number(value));
      if (name.includes('bonus-number')) drawingNumbers.bonusNumber = Number(value);
    });

    const { isValid } = Validator.Inputs.drawingNumbers(drawingNumbers, { onError: alert });

    if (isValid) {
      this.props.updateDrawingNumbers(drawingNumbers);
      this.props.openModal();
    }
  }
}
