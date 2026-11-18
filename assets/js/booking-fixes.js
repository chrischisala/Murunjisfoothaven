/* FILE: assets/js/booking-fixes.js
   Create this file. Keep your existing main.js.
   Load this AFTER main.js using the HTML lines below. */

(() => {
  'use strict';

  function init() {
    const todayInLusaka = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Lusaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(new Date());

      const part = type =>
        parts.find(item => item.type === type)?.value || '';

      return `${part('year')}-${part('month')}-${part('day')}`;
    };

    const dateInputs = ['quickDateInput', 'modalDateInput']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const refreshDates = () => {
      dateInputs.forEach(input => {
        input.min = todayInLusaka();
        input.setCustomValidity(
          input.value && input.value < input.min
            ? 'Please choose today or a future date.'
            : ''
        );
      });
    };

    dateInputs.forEach(input => {
      input.addEventListener('input', refreshDates);
    });

    window.addEventListener('focus', refreshDates);
    refreshDates();

    const value = id =>
      document.getElementById(id)?.value.trim() || '';

    function send(form, text) {
      refreshDates();
      if (!form.reportValidity()) return false;

      const url =
        `https://wa.me/260764602248?text=${encodeURIComponent(text)}`;

      // The customer still needs to press Send inside WhatsApp.
      // Do not redirect based on the return value: noopener may return null
      // even when the new tab opens successfully.
      window.open(url, '_blank', 'noopener,noreferrer');
      return true;
    }

    const quick = document.getElementById('quickBookingForm');

    if (quick) {
      quick.addEventListener('submit', event => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const text =
          `Hello Murunji's Foot Haven & Nail Bar!\n\n` +
          `I would like to request an appointment:\n` +
          `• Service: ${value('quickServiceSelect')}\n` +
          `• Date: ${value('quickDateInput')}\n` +
          `• Time: ${value('quickTimeSelect')}\n` +
          `• Guests: ${value('quickGuestsSelect')}\n` +
          `• Location: Chamba Valley (Mosi-oa-Tunya Shopping)\n\n` +
          `Please confirm availability. This is an appointment request, ` +
          `not a confirmed booking.`;

        send(quick, text);
      }, true);
    }

    const modalForm = document.getElementById('modalBookingForm');

    if (modalForm) {
      modalForm.addEventListener('submit', event => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const notes = value('modalNotesInput');
        const text =
          `Hello Murunji's Foot Haven Spa & Nail Bar!\n\n` +
          `Appointment Request:\n` +
          `• Client Name: ${value('modalNameInput')}\n` +
          `• Client Phone: ${value('modalPhoneInput')}\n` +
          `• Desired Treatment: ${value('modalServiceSelect')}\n` +
          `• Preferred Date: ${value('modalDateInput')}\n` +
          `• Preferred Time: ${value('modalTimeInput')}\n` +
          (notes ? `• Special Notes: ${notes}\n` : '') +
          `\nPlease confirm availability. This is an appointment request, ` +
          `not a confirmed booking.`;

        send(modalForm, text);

        // Keep the form details visible so the customer can retry
        // if WhatsApp does not open.
      }, true);
    }

    const menu = document.getElementById('menuToggleBtn');
    const links = document.getElementById('navLinks');

    if (menu && links) {
      menu.type = 'button';
      menu.setAttribute('aria-controls', 'navLinks');

      const sync = () => {
        menu.setAttribute(
          'aria-expanded',
          String(links.classList.contains('open'))
        );
      };

      new MutationObserver(sync).observe(links, {
        attributes: true,
        attributeFilter: ['class']
      });

      sync();

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && links.classList.contains('open')) {
          links.classList.remove('open');
          menu.focus();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
