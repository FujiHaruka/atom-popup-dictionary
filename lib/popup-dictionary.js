'use babel'

import PopupDictionaryView from './popup-dictionary-view'
import { CompositeDisposable } from 'atom'

export default {
  popupDictionaryView: null,
  modalPanel: null,
  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'popup-dictionary:open': () => this.open()
    }))
  },

  deactivate () {
    this.destroyView()
    this.subscriptions.dispose()
  },

  serialize () {},

  open () {
    if (this.modalPanel) {
      return
    }
    const editor = atom.workspace.getActiveTextEditor()
    const text = editor.getSelectedText()
    if (text.length === 0) {
      return
    }
    this.popupDictionaryView = new PopupDictionaryView({
      text,
      onClose: this.destroyView.bind(this)
    })
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.popupDictionaryView.getElement(),
      visible: true
    })
  },

  close () {
    this.destroyView()
  },

  destroyView () {
    if (this.modalPanel) {
      this.modalPanel.destroy()
      delete this.modalPanel
    }
    if (this.popupDictionaryView) {
      this.popupDictionaryView.destroy()
      delete this.popupDictionaryView
    }
  }
}

/* global atom */
