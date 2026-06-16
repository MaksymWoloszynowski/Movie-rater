kubectl create secret tls tls-secret \
  -n movie-rater \
  --cert=movie-rater.local+1.pem \
  --key=movie-rater.local+1-key.pem