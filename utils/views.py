from django.views.generic import TemplateView


__all_ = [
    'IndexView',
    'TPLView'
]


class IndexView(TemplateView):
    template_name = 'index.html'


class TPLView(TemplateView):
    """
    This view is required for rendering angularJS templates
    """

    def get_template_names(self):
        return [
            "tpl/{0}".format(self.kwargs.get('tpl_name'))
    ]
