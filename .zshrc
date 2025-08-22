# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
# Explicitly use Python 3.12
export PATH="/Library/Frameworks/Python.framework/Versions/3.12/bin:$PATH"
export PATH="/usr/local/bin:$PATH"
__conda_setup="$('/Users/ivan/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/ivan/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/ivan/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/ivan/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

export PATH="$HOME/Library/Python/3.12/bin:$PATH"

