from __future__ import annotations
import os
from glob import glob

def get_by_ext(ext: str, path: str) -> list[str]:
    pattern = os.path.join('src', f'**/{path}*.{ext}')
    print(f'Globbing by pattern: {pattern}')
    return [os.path.abspath(path) for path in glob(pattern, recursive=True)]

def get_html_paths(path: str):
    return get_by_ext('html', path) + get_by_ext('htm', path)

def get_urls(path=''):
    paths = get_html_paths(path)
    return ['file://' + path for path in paths]