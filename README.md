# dorc

A tool for orchestrating services with docker.

(documentation coming one day...)

```yaml
locals: ./config.yaml
defaultMode: development
services:
  hello:
    image: pmkr/hello:1.0
    cmd: darkness, my old friend
    volumes:
      - /tmp:/tmp
    production:
      net: host
      cmd: Kitty
```

```sh
$ dorc up hello
dorc run --name {project-dir}_hello -v /tmp:/tmp pmkr/hello:1.0 darkness, my old friend

$ dorc -m production up hello
dorc run --name {project-dir}_hello -v /tmp:/tmp --net host pmkr/hello:1.0 Kitty
```
