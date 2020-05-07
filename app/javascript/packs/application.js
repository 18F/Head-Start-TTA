// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")
require("chartkick")
require("chart.js")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import 'uswds/src/stylesheets/uswds.scss'
import 'uswds/dist/img/close.svg'
import 'uswds/dist/img/icon-dot-gov.svg'
import 'uswds/dist/img/us_flag_small.png'
import 'uswds/dist/img/icon-https.svg'

require('uswds')

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faPhoneVolume,
  faLaptop,
  faUser,
  faUsers,
  faFileMedical,
  faCheckCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faPhoneVolume)
library.add(faLaptop)
library.add(faUsers)
library.add(faUser)
library.add(faFileMedical)
library.add(faCheckCircle)
library.add(faMinusCircle)
dom.watch()
