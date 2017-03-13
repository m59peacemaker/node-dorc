# dorc

A tool for orchestrating services with docker.

(documentation coming one day...)

my-project/dorc.yaml
```yaml
locals: ./config.yaml
defaultMode: development
services:
  hello:
    image: pmkr/hello:1.0
    cmd: darkness, my old friend
    volumes:
      - /tmp:/tmp
    mode:
      production:
        net: host
        cmd: Kitty
```

```sh
$ dorc up hello
dorc run --name my-project_hello -v /tmp:/tmp pmkr/hello:1.0 darkness, my old friend
Hello, darkness my old friend

$ DORC_MODE=production dorc up hello
dorc run --name my-project_hello -v /tmp:/tmp --net host pmkr/hello:1.0 Kitty
Hello, Kitty
```
