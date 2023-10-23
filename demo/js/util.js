function removeValues(text, valuesTobeRemoved) {
  for (const val of valuesTobeRemoved) {
    text = text.split(val).join('');
  }
  return text;
}