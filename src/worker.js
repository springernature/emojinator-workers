import emoji from 'moji-translate';

export async function emojifyFile(file) {
    const translated = emoji.translate(file);
    return translated;
}