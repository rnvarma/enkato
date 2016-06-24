from django.core.management.base import BaseCommand, CommandError
import os

baseSCSS = """
@import '../../globals/colors.scss';
@import '../../globals/mixins.scss';

.%s {
    
}
"""

baseJSX = """
require("css/%s/%s/%s.scss");

var React = require('react')

module.exports = React.createClass({
    render: function() {
        return (
            <div className="%s">
                %s
            </div>
        )
    }
})
"""

importCommand = "var %s = require('js/%s/%s/%s');"

class Command(BaseCommand):
    help = "create a new react component -- initializes jsx + scss"

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)
        parser.add_argument('app', type=str)
        parser.add_argument('endpoint', type=str)

    def handle(self, *args, **options):
        spec_path = options["app"] + os.sep + options["endpoint"] + os.sep + options["name"]
        camelCaseName = options["name"][0].lower() + options["name"][1:]
        
        scss_path = "assets/css" + os.sep + spec_path + ".scss"
        scss_file = open(scss_path, "w+")
        scss_file.write(baseSCSS % camelCaseName)
        scss_file.close()

        jsx_path = "assets/js" + os.sep + spec_path + ".jsx"
        jsx_file = open(jsx_path, "w+")
        jsx_file.write(baseJSX % (options["app"], options["endpoint"], options["name"], camelCaseName, options["name"]))
        jsx_file.close()
        print importCommand % (options["name"], options["app"], options["endpoint"], options["name"])
        


