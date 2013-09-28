(defproject baseline "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/tools.cli "0.2.2"]
                 [compojure "1.1.5"]
                 [ring "1.2.0"]
                 [ring/ring-json "0.2.0"]
                 [com.cemerick/friend "0.1.5"]
                 [prismatic/plumbing "0.1.0"]
                 [cheshire "5.2.0"]]
  :plugins [[lein-ring "0.8.7"]]
  :ring {:handler baseline.server/app}
  :main baseline.server)
