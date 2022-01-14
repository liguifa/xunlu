from app.base.controller import controller
from tornado import locale
import os

class authorize(controller):
    def prepare(self):
        i18n_path = os.path.dirname(os.path.realpath(__file__), "locale"),
        locale.load_gettext_translations(i18n_path, "notewo")
        locale.set_default_locale(self.get_cookie('lang') or 'CN')
        return True

    def finish(self):
        pass