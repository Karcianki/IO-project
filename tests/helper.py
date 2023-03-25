from __future__ import annotations
import os
from glob import glob

def get_by_ext(ext: str) -> list[str]:
    pattern = os.path.join('src', f'**/*.{ext}')
    print(f'Globbing by pattern: {pattern}')
    return [os.path.abspath(path) for path in glob(pattern, recursive=True)]

def get_html_paths():
    return get_by_ext('html') + get_by_ext('htm')

def get_url():
    paths = get_html_paths()
    assert len(paths) >= 1
    print('file://' + paths[0])
    return 'file://' + paths[0]

def get_urls():
    paths = get_html_paths()
    return ['file://' + path for path in paths]