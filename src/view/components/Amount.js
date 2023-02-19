import Component from '../../Component.js';
import generateMessages from '../../utils/generateMessages.js';
import Inputs from '../../utils/Inputs.js';
import { LOTTO } from '../../constants/values.js';
import { LottoStore } from '../../domain/Lotto.js';

export default class Amount extends Component {
  #total;

  #lottoList;

  setUp({ setter }) {
    this.setter = setter;
  }

  async read() {
    const amount = await Inputs.readAmount();

    this.#total = amount / LOTTO.PRICE;
    this.#lottoList = LottoStore.purchase(this.#total);
    this.setter({ total: this.#total, lottoList: this.#lottoList });
  }

  template() {
    return generateMessages.countMessage(this.#total);
  }
}
