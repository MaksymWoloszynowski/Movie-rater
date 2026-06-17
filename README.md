## Autor:
Maksym Wołoszynowski

# Uruchomienie środowiska lokalnego

## Wymagania

Zainstaluj wymagane narzędzia:

### Kind

#### Linux

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

#### macOS

```bash
brew install kind
```

### Kubectl

#### Linux

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl
sudo mv kubectl /usr/local/bin/
```

#### macOS

```bash
brew install kubectl
```

---

## 1. Utworzenie klastra Kind

```bash
cat <<EOF | kind create cluster --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
 - role: control-plane
   kubeadmConfigPatches:
   - |
     kind: InitConfiguration
     nodeRegistration:
       kubeletExtraArgs:
         node-labels: "ingress-ready=true"
   extraPortMappings:
   - containerPort: 80
     hostPort: 80
     protocol: TCP
   - containerPort: 443
     hostPort: 443
     protocol: TCP
EOF
```

---

## 2. Instalacja Ingress NGINX

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

---

## 3. Konfiguracja lokalnych domen

Dodaj wpisy do `/etc/hosts`:

```text
127.0.0.1 movie-rater.local
127.0.0.1 auth.movie-rater.local
```

---

## 4. Wygenerowanie certyfikatów TLS

### Linux

```bash
sudo apt install mkcert
```

### macOS

```bash
brew install mkcert
```

```bash
mkcert --install
mkcert movie-rater.local auth.movie-rater.local
```

---

## 5. Utworzenie sekretu TLS

```bash
kubectl create secret tls tls-secret \
  -n movie-rater \
  --cert=movie-rater.local+1.pem \
  --key=movie-rater.local+1-key.pem
```

---

## 6. Uruchomienie aplikacji

```bash
./run
```

Po uruchomieniu:

- aplikacja: https://movie-rater.local  
- Keycloak: https://auth.movie-rater.local  

---

# Konfiguracja Keycloak

## Logowanie do panelu

```text
URL: https://auth.movie-rater.local
login: admin
password: admin
```

---

## Konfiguracja realm

1. Utwórz realm:
```text
movie-rater
```

---

## Konfiguracja klienta

1. Utwórz klienta:
```text
frontend-client
```

2. Ustaw:
- OpenID Connect
- Client authentication: OFF
- PKCE: S256 REQUIRED
- Redirect URI:
```text
https://movie-rater.local/*
```
- Web Origins:
```text
https://movie-rater.local
```

---

## Rejestracja użytkowników

W realm:
```text
Realm Settings → Login → User registration = ON
```

---

## Role

1. Utwórz rolę:
```text
admin
```

2. Przypisz do użytkownika w zakładce:
```text
Users → Role mapping
```

---

# Backend secrets

W pliku:

```text
backend-secrets.yaml
```

należy ustawić klucz publiczny (RS256) w formacie base64:

```bash
echo -n "<TWÓJ_PUBLIC_KEY_RS256>" | base64
```

Wynik wklej do sekcji secret jako wartość pola.

---