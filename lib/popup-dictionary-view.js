'use babel'

export default class PopupDictionaryView {
  constructor ({text, onClose}) {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('popup-dictionary')

    {
      const searchWords = document.createElement('div')
      searchWords.textContent = text
      searchWords.classList.add('search-words')
      this.element.appendChild(searchWords)
    }

    {
      const meaning = document.createElement('div')
      meaning.textContent = 'Not Found'
      meaning.classList.add('meaning')
      this.element.appendChild(meaning)
    }

    this.element.addEventListener('click', onClose)
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }
}
