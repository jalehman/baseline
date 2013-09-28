(ns baseline.config
  (:require [clojure.tools.cli :refer [cli]]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(def default-config
  {:port 8080})

(defn parse-resource [f]
  (when-let [r (io/resource f)] (read-string (slurp r))))

(def config (merge default-config (parse-resource "config.clj")))

(defn remove-nil-vals [m]
  (into {} (remove #(nil? (val %)) m)))

(defn parse-file [f]
  (read-string (slurp (io/file f))))

(defn parse-args
  [args defaults]
  (cli args
       ["-h" "--help" "Show this help text and exit" :flag true]
       ["-p" "--port" "Port to listen on for web requests"
        :parse-fn #(Integer/parseInt %) :default (:port defaults)]))

(def env-vars
  [["PORT" :port #(Integer/parseInt %)]])

(defn parse-env []
  (reduce
   (fn [m [var k & [f]]]
     (if-let [x (System/getenv var)]
       (assoc m k ((or f identity) x))
       m))
   {} env-vars))

(defn parse-config [args]
  (let [env-opts (merge default-config (parse-env))
        [arg-opts args banner] (parse-args args env-opts)
        arg-opts (remove-nil-vals arg-opts)
        opts (if-let [f (or (:config-file arg-opts) (:config-file env-opts))]
               (merge env-opts (parse-file f) arg-opts)
               (merge env-opts arg-opts))]
    [opts args banner]))

(defn configure [args]
  (let [[options args banner] (parse-config args)]
    (when (:help options)
      (println banner) (System/exit 0))
    (alter-var-root #'config (fn [_] options))))
