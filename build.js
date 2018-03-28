/**
* THIS FILE BUILDS ALL OF THE USED FILES IN INDEX.HTML INTO ONE FILE, INCLUDING
* EXTERNALLY LINKED STYLESHEETS AND JAVASCRIPT FILES. THIS IMPROVES LOAD TIME.
* SIMPLE OPTIMIZATIONS ARE ALSO PERFORMED HERE.
*
* NOTE: THIS BUILD SCRIPT IS VERY STRICT REGARDING THE SUPPORTED HTML SYNTAX
* NOTE: This is also extremely fragile. This will be updated to be more flexibile
* with relative paths in the future.
*
* @AUTHOR Arthur Rattew (crypto-sr)
**/

(() => {
    const USAGE_MESSAGE = "Incorrect program usage.\n" +
    "Expected use in the form:\n" + process.argv[0] + " " + process.argv[1] +
    " [path to base file] [path to output directory]\n" +
    "Note: If the first argument is omitted, the second argument must also be omitted.";
    
    if (process.argv.length > 4) {
        console.error(USAGE_MESSAGE);
        return;
    }
    
    const BASE_FILE_PATH = process.argv[2] == undefined ? "/index.html" : process.argv[2];
    const OUTPUT_FILE_PATH = process.argv[3] == undefined ? "/optimized" : process.argv[3];
    const ASSETS_DIR = "/assets";
    const fs = require('fs');
    const path = require('path');
    
    /**
    * Synchronously loads a file, normally a bad practice, but this is a build script
    * @param {String} url - the url
    * @return {String} the file contents of that URL
    */
    function loadFileSync(url) {
        let file = require('fs').readFileSync(url, 'utf-8');
        return file;
    }
    
    /**
    * This function removes all comments from a string of HTML code that don't
    * include the @keep directive
    * @param {String} file - the string representation of the html file
    */
    function removeComments(file) {
        let f_match = file.match(/<!--(.|\r|\n)*?-->/gm);
        
        // no comments to remove
        if (f_match == null) {
            return file;
        }
        
        for (let i = 0; i < f_match.length; i++) {
            let inst = f_match[i];
            if (!inst.match(/(@keep|@KEEP)/gm)) {
                file = file.replace(inst, "");
            } // otherwise we want to include this comment
        }
        return file;
    }
    
    /**
    * This function removes all comments from a string of CSS code that don't
    * include the @keep directive
    * @param {String} css_file - the string representation of the CSS file
    */
    function removeCSSComments(css_file) {
        let f_match = css_file.match(/\/\*(.|\r|\n)*?\*\//gm);
        
        // if file had comments
        if (f_match != null) {
            for (let i = 0; i < f_match.length; i++) {
                let inst = f_match[i];
                if (!inst.match(/(@keep|@KEEP)/gm)) {
                    css_file = css_file.replace(inst, "");
                } // otherwise we want to include this comment
            }
        }

        return css_file;
    }
    
    /**
    * This function removes all comments from a string of js code that don't
    * include the @keep directive
    * NOTE: THIS MAY BREAK CODE WHERE COMMENTS ARE ESCAPED FOR SOME REASON
    * @param {String} css_file - the string representation of the js file
    */
    function removeJavaScriptComments(js_file) {
        // remove single-line comments first:
        // NOTE: THIS MAY FAIL IN A CASE WHERE A SINGLE LINE COMMENT IS INSIDE OF A STRING
        // this works, but only when the single line comment is in the form of a url
        // [^"][^']\/\/.*
        let matches = js_file.match(/([^:]|^)\/\/.*$/gm);
        if (matches != null) {
            for (let i = 0; i < matches.length; ++i) {
                let inst = matches[i];
                js_file = js_file.replace(inst, "");
            }
        }
        
        
        // remove multi-line comments... same as css multi-line comments
        js_file = removeCSSComments(js_file);
        
        return js_file;
    }
    
    /**
    * This embeds externally linked style sheets into the HTML page
    * @param {String} file - the string representation of the HTML file
    */
    function parseLinks(file) {
        
        // Yes using regular expressions to parse HTML is evil
        let link_tags = file.match(/<link(.|\n|\r)*?>/gm);
        
        // no link tags found
        if (link_tags == null) {
            return file;
        }
        
        for (let i = 0; i < link_tags.length; ++i) {
            let item = link_tags[i];
            // capture the href in the link
            let link = item.match(/(href\s*=\s*('|")?).*('|"|\s)?/gm)[0];
            link = link.slice(link.indexOf("="), link.length).slice(1,link.length).trim();
            link = link[link.length - 1] == ">" ? link.slice(0,link.length - 1) : link;
            
            link = link.split(/\s/)[0];
            // remove all occurances of ' or " from the string
            while (link.match(/("|')/)) {
                link = link.replace(/("|')/, "");
            }
            
            // link should now contain the correct path
            // just need to make sure the value of rel is stylesheet
            if (!item.match("stylesheet")) {
                continue;
            }
            
            // ensure its a relative URL
            if (link.match(/^https?:\/\//i)) {
                continue;
            }
            
            let css_text = loadFileSync(link);
            
            css_text = removeCSSComments(css_text);
            css_text = "<style>" + css_text + "</style>";
            file = file.replace(item, css_text);
        }
        // if anywhere in the code there is a </style> followed by a <style>
        // with only whitespace seperating them, there is no need and both can be
        // removed (this was also likely generated by the above code)
        file = file.replace(/<\/style>(\s|\n|\r)*?<style>/gm, "");
        return file;
    }
    
    /**
    * This embeds externally linked scripts into the HTML page
    * @param {String} file - the string representation of the HTML file
    */
    function parseScripts(file) {
        
        let script_tags = file.match(/<script(.|\n|\r)*?>/gm);
        
        // no script tags found
        
        if (script_tags == null) {
            return file;
        }
        
        let concat_scripts = "";
        for (let i = 0; i < script_tags.length; ++i) {
            let item = script_tags[i];
            
            // if the current item doesn't have a src attribute, its already an
            // inlined script
            if (!item.match(/\s+src\s*=/gm)) {
                continue;
            }
            
            // capture the src in the link
            let link = item.match(/(src\s*=\s*('|")?).*('|"|\s)?/gm)[0];
            link = link.slice(link.indexOf("="), link.length).slice(1,link.length).trim();
            link = link[link.length - 1] == ">" ? link.slice(0,link.length - 1) : link;
            
            link = link.split(/\s/)[0];
            // remove all occurances of ' or " from the string
            while (link.match(/("|')/)) {
                link = link.replace(/("|')/, "");
            }

            // ensure its a relative URL
            if (link.match(/^https?:\/\//i)) {
                continue;
            }
            
            
            let script_text = loadFileSync(link);
            
            script_text = removeJavaScriptComments(script_text);
            
            // the closing script tag should already be included
            // regex at the top of this function only searches for the opening tag
            // thus the closing tag must be in the code already
            script_text = "<script type='text/javascript'>" + script_text;
            file = file.replace(item, script_text);
        }
        // if anywhere in the code there is a </style> followed by a <style>
        // with only whitespace seperating them, there is no need and both can be
        // removed (this was also likely generated by the above code)
        // TECHNICALLY, THIS COULD BREAK IF THE SCRIPT ABOVE IS NOT TYPE=TEXT/JAVASCRIPT
        // BUT THATS AN UNLIKELY SCENERIO
        // file = file.replace(/<\/script>(\s|\n|\r)*?<script type='text\/javascript'>/gm, "");
        
        return file;
    }
    
    /**
    * This function loads the dependencies references in the given file.
    * NOTE: This method should work with most common HTML syntaxes, but
    * it does NOT work with ALL possible HTML syntax.
    * @param {String} file - a string representation of the file to parse
    */
    function loadDependancies(file) {
        // first removing all (non @keep) comments from file
        file = removeComments(file);
        
        // handles the inclusion of CSS
        file = parseLinks(file);
        
        // handles the inclusion of script tags
        file = parseScripts(file);
        
        return file;
        
    }

    function loadFile (path_in, callback) {
        let file_path = path.join(__dirname, path_in);
        fs.readFile(file_path, {encoding: 'utf-8'}, function(error, data){
            if (!error) {
                callback(data);
            } else {
                console.log(error);
            }
        });
    }
    
    function copyAndWrite(parsed_data) {
        // now copy assets folder
        let ncp = require('ncp').ncp;
        
        // check if assets dir exists
        if (!fs.existsSync(__dirname + OUTPUT_FILE_PATH)){
            fs.mkdirSync(__dirname + OUTPUT_FILE_PATH);
            if (!fs.existsSync(__dirname + OUTPUT_FILE_PATH + ASSETS_DIR)) {
                fs.mkdirSync(__dirname + OUTPUT_FILE_PATH + ASSETS_DIR);
            }
        }
        
        
        ncp(__dirname + ASSETS_DIR, __dirname + OUTPUT_FILE_PATH + ASSETS_DIR, err => {
            if (err) return console.error("[ERROR 000-002]", err);
            
            fs.writeFile(__dirname + OUTPUT_FILE_PATH + "/index.html", parsed_data, err => {
                if(err) return console.log(err);
            });
            
            console.log("\x1b[32m%s\x1b[0m", "[SUCCESS]");
            
        });
        
        
    }
    
    function clearOutputDirectory(parsed_data) {
        let rimraf = require('rimraf');
        
        rimraf(__dirname + OUTPUT_FILE_PATH, (err) => {
            if (err) return console.error("[ERROR 000-001]", err);
            
            console.log('Directory cleared.');
            
            copyAndWrite(parsed_data);
            
        });
        
        
    }
    
    loadFile(BASE_FILE_PATH, (data) => {
        let parsed_data = loadDependancies(data);
        
        // minify the parsed HTML
        let minify = require('html-minifier').minify;
        parsed_data = minify(parsed_data, {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        });

        // check if output directory exists
        if (!fs.existsSync(__dirname + OUTPUT_FILE_PATH)){
            console.log("Output directory created...");
            fs.mkdirSync(__dirname + OUTPUT_FILE_PATH);
            // if this directory did not exists, the assets dir within it cannot exist
            fs.mkdirSync(__dirname + OUTPUT_FILE_PATH + ASSETS_DIR);
            copyAndWrite(parsed_data);
        } else {
            console.log("Clearing existing output directory...");
            // clear the output directory
            clearOutputDirectory(parsed_data);
        }
    });

})();