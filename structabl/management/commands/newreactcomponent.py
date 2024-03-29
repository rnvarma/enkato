from django.core.management.base import BaseCommand
import os

baseSCSS = """\
.{camelCaseName} {{
    
}}
"""

baseJSX = """\
require('css/{app}/{endpoint}/{name}.scss');

import React from 'react';

class {name} extends React.Component {{
    render() {{
        return (
            <div className="{camelCaseName}">
            </div>
        );
    }}
}}

export default {name};
"""

importCommand = "import {name} from 'js/{app}/{endpoint}/{name}';"

class Command(BaseCommand):
    help = 'create a new react component -- initializes jsx + scss'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)
        parser.add_argument('app', type=str)
        parser.add_argument('endpoint', type=str)

    def handle(self, *args, **options):
        spec_path = options['app'] + os.sep + options['endpoint'] + os.sep + options['name']
        camelCaseName = options['name'][0].lower() + options['name'][1:]
        
        scss_path = 'assets/css' + os.sep + spec_path + '.scss'
        scss_file = open(scss_path, 'w+')
        scss_file.write(baseSCSS.format(camelCaseName=camelCaseName))
        scss_file.close()

        jsx_path = 'assets/js' + os.sep + spec_path + '.jsx'
        jsx_file = open(jsx_path, 'w+')
        jsx_file.write(baseJSX.format(camelCaseName=camelCaseName, **options))
        jsx_file.close()

        print importCommand.format(**options)
        


